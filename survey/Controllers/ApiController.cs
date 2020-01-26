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

    public class ApiController :Controller
    {
        private int participants=0;

        private WritablePair<int,SemaphoreSlim> participantsIdCounter=new WritablePair<int, SemaphoreSlim>(){first=0,second=new SemaphoreSlim(1)};

        private List<List<String>> questions;

        private List<WritablePair<List<int>,SemaphoreSlim>> answers;
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
            await participantsIdCounter.second.WaitAsync();
            if(participantsIdCounter.first+request.participants>participants){
                participantsIdCounter.second.Release();
                return StatusCode(409);
            }
            var ids=new List<int>();
            for (int x=0;x<request.participants;x++)ids.Add(participantsIdCounter.first++);
            participantsIdCounter.second.Release();
            return Json(new RegisterResponse(){ids=ids,questions=questions});
        }

        [HttpPut]
        [Consumes("application/json")]        
        public async Task<IActionResult> SetConfig(){
            AdminSettingsRequest request=await JsonSerializer.DeserializeAsync<AdminSettingsRequest>(Request.BodyReader.AsStream());
            if(participants!=0)return StatusCode(409);
            if(request.participants<1 || request.questions==null)return StatusCode(400);
            participants=request.participants;
            questions=request.questions;
            answers=new List<WritablePair<List<int>, SemaphoreSlim>>();
            for (int x=0;x<request.participants;x++) answers.Add(new WritablePair<List<int>, SemaphoreSlim>(){first=null,second=new SemaphoreSlim(1)});
            return Ok();
        }
    }
}