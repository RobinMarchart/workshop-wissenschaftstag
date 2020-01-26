using System.Threading;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using survey.Types;

namespace survey.Controllers{

    public class ApiController :Controller{
        private readonly ILogger<SurveyController> _logger;

        public ApiController(ILogger<SurveyController> logger)
        {
            _logger = logger;
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