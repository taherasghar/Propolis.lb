using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Propolis.Models;

namespace Propolis.Main.IServices
{
    public interface ITokenService
    {
        public Task<string> CreateToken(User user);

    }
}