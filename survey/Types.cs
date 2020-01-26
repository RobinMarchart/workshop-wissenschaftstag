using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace survey.Types
{


    public class GlobalState{
        public int participants=0;

        public SemaphoreSlim initialized=new SemaphoreSlim(0);

        public WritablePair<int,SemaphoreSlim> participantsIdCounter=new WritablePair<int, SemaphoreSlim>(){first=0,second=new SemaphoreSlim(1)};

        public List<Question> questions;

        public List<WritablePair<List<int>,SemaphoreSlim>> answers;

        public int answersGiven=0;

        public Task<String> results;

        public static GlobalState globalState=new GlobalState();

    }

    public struct AdminSettingsRequest
    {
        public int participants { get; set; }
        public List<Question> questions { get; set; }
    }

    public struct RegisterRequest
    {
        public int participants {get; set;}
    }

    public struct RegisterResponse{
        public List<int> ids {get; set;}
        public List<Question> questions { get; set; }
    }

    public struct WritablePair<T1,T2>{
        public T1 first {get;set;}
        public T2 second {get;set;}
    }

    public struct Question{
        public String descr {get; set;}
        public List<String> options {get;set;}
    }

    public struct AnswerRequest{
        public int id {get; set;}
        public List<int> answers {get;set;}
    }

    public struct StatusResponse{
        public int all {get;set;}
        public int curr {get;set;}
    }

}