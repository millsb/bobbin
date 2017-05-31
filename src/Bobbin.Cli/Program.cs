using System;
using Microsoft.Extensions.CommandLineUtils;

namespace Bobbin.Cli
{
    class Program
    {
        static void Main(string[] args)
        {
            var app = new CommandLineApplication(throwOnUnexpectedArg: false)
            {
                Name = "dotnet bob",
                FullName = "Bobbin CLI Tools",
                Description = "Handy tools to use with Bobbin"
            };

        }
    }
}
