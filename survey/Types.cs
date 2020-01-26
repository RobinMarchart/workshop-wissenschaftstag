using System;
using System.Threading;
using System.Collections.Generic;

namespace survey.Types
{


    public class GlobalState{
        public int participants=0;

        public SemaphoreSlim initialized=new SemaphoreSlim(0);

        public WritablePair<int,SemaphoreSlim> participantsIdCounter=new WritablePair<int, SemaphoreSlim>(){first=0,second=new SemaphoreSlim(1)};

        public List<List<String>> questions;

        public List<WritablePair<List<int>,SemaphoreSlim>> answers;

        public static GlobalState globalState=new GlobalState();

    }

    public class AdminSettingsRequest
    {
        public int participants { get; set; }
        public List<List<String>> questions { get; set; }
    }

    public class RegisterRequest
    {
        public int participants {get; set;}
    }

    public class RegisterResponse{
        public List<int> ids {get; set;}
        public List<List<String>> questions { get; set; }
    }

    public struct WritablePair<T1,T2>{
        public T1 first {get;set;}
        public T2 second {get;set;}
    }

}