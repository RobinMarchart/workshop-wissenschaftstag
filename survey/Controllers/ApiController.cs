using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace survey.Controllers{

    [ApiController]
    public class ApiController :Controller
    {
        public class AdminSettingsRequest{
            public int participants;
            public List<List<String>> questions;
        }

        private int participants;

        private List<List<String>> questions;
        private readonly ILogger<SurveyController> _logger;

        public ApiController(ILogger<SurveyController> logger)
        {
            _logger = logger;
        }

        [HttpPut]
        public IActionResult SetConfig(AdminSettingsRequest request){
            if(participants<1)return StatusCode(400);
            participants=request.participants;
            questions=request.questions;
            return Ok();
        }
    }
}