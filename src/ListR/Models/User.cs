using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListR.Models
{
    public class User
    {
        //user = { firstName: 'Jacques', lastName: 'Steward', uuid: device.uuid };

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UUID { get; set; }
        public string EmailAddress { get; set; }
        public string FacebookId { get; set; }
        public string Password { get; set; }
        public ICollection<UserList> UserLists { get; set; }
    }
}
