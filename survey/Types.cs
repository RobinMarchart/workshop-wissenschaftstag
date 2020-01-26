using System;
using System.Collections.Generic;

namespace survey.Types
{
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