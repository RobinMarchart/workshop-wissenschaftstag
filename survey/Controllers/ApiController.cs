using System.Threading;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Text.Json;
using survey.Types;

namespace survey.Controllers{

    public class ApiController :Controller{
        private readonly ILogger<SurveyController> _logger;

        public ApiController(ILogger<SurveyController> logger)
        {
            _logger = logger;
        }

        [NonAction]
        String GenerateResults(){
            //Close accepting answers
            GlobalState.globalState.answers.ForEach(x=>x.second.Wait());
            Func<IEnumerable<String>,String> toLine=x=>x.Aggregate((x,y)=>x+';'+y)+"\n";
            String csv =toLine(new String[] {"Item"}.Concat(Enumerable.Range(1,GlobalState.globalState.questions.Count).Select(x=>x.ToString())));
            csv+=GlobalState.globalState.answers.Select((x,y)=>new String[]{(y+1).ToString()}.Concat(x.first.Select(x=>x.ToString()))).Select(toLine).Aggregate((x,y)=>x+y);
            GlobalState.globalState.answers.ForEach(x=>x.second.Release());
            return csv;
        }

        public async Task<IActionResult> Result(){
            string result=await GlobalState.globalState.results;
            return File(Encoding.UTF8.GetBytes(result,0,result.Count()),"application/octet-stream");
        }

        public async Task<IActionResult> Status(){
            await GlobalState.globalState.initialized.WaitAsync();
            GlobalState.globalState.initialized.Release();
            return Json(new StatusResponse(){all=GlobalState.globalState.participants,curr=GlobalState.globalState.answersGiven});
        }

        [HttpPut]
        [Consumes("application/json")] 
        public async Task<IActionResult> Answer(){
            AnswerRequest request= await JsonSerializer.DeserializeAsync<AnswerRequest>(Request.BodyReader.AsStream());
            var user=GlobalState.globalState.answers[request.id];
            await user.second.WaitAsync();
            bool finished=false;
            if(user.first==null){
                var count=Interlocked.Increment(ref GlobalState.globalState.answersGiven);
                if (count>=GlobalState.globalState.participants)finished=true;
            }
            user.first=request.answers;
            user.second.Release();
            
            if(finished)GlobalState.globalState.results=Task.Run(GenerateResults);

            return Ok();
        }

        [HttpPost]
        [Consumes("application/json")] 
        public async Task<IActionResult> Register(){
            RegisterRequest request=await JsonSerializer.DeserializeAsync<RegisterRequest>(Request.BodyReader.AsStream());
            if(request.participants<1)return StatusCode(400);
            await GlobalState.globalState.initialized.WaitAsync();
            GlobalState.globalState.initialized.Release();
            await GlobalState.globalState.participantsIdCounter.second.WaitAsync();
            if(GlobalState.globalState.participantsIdCounter.first+request.participants>GlobalState.globalState.participants){
                GlobalState.globalState.participantsIdCounter.second.Release();
                return StatusCode(409);
            }
            var ids=new List<int>();
            for (int x=0;x<request.participants;x++)ids.Add(GlobalState.globalState.participantsIdCounter.first++);
            GlobalState.globalState.participantsIdCounter.second.Release();
            return Json(new RegisterResponse(){ids=ids,questions=GlobalState.globalState.questions});
        }

        [HttpPut]
        [Consumes("application/json")]        
        public async Task<IActionResult> SetConfig(){
            AdminSettingsRequest request=await JsonSerializer.DeserializeAsync<AdminSettingsRequest>(Request.BodyReader.AsStream());
            if(GlobalState.globalState.participants!=0)return StatusCode(409);
            if(request.participants<1 || request.questions==null)return StatusCode(400);
            GlobalState.globalState.participants=request.participants;
            GlobalState.globalState.questions=request.questions;
            GlobalState.globalState.answers=new List<WritablePair<List<int>, SemaphoreSlim>>();
            for (int x=0;x<request.participants;x++) GlobalState.globalState.answers.Add(new WritablePair<List<int>, SemaphoreSlim>(){first=null,second=new SemaphoreSlim(1)});
            GlobalState.globalState.initialized.Release();
            return Ok();
        }
    }
}