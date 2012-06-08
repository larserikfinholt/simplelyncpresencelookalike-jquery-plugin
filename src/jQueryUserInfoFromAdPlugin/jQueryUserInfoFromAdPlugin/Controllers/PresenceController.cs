using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace jQueryUserInfoFromAdPlugin.Controllers
{
    public class UserInfo
	{
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
	}

    public class PresenceController : ApiController
    {
        // GET api/presence
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/presence/5
        public UserInfo Get(string userid)
        {
            switch (userid)
            {
                case "user1":
                    return new UserInfo { PhoneNumber = "95271895", Email = "lars.erik.finholt@gmail.com", Role = "Utvikler", Image = "http://i1.silverlight.net/avatar/leflef.jpg?forceidenticon=false&dt=634728795000000000&enableAvatar=False&cdn_id=2011-08-31-003" };
                default:
                    return new UserInfo { PhoneNumber = "(ukjent tlf)", Email = "(ingen epost)", Role = "(ingen rolle)", Image = "data:image/jpeg;base64,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" };
            }

        }

        // POST api/presence
        public void Post(string value)
        {
        }

        // PUT api/presence/5
        public void Put(int id, string value)
        {
        }

        // DELETE api/presence/5
        public void Delete(int id)
        {
        }
    }
}
