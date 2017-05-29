using System.Collections.Generic;
using Bobbin.Web.Patterns;
using Microsoft.AspNetCore.Mvc;

namespace Bobbin.Web.Controllers
{
    public class PatternsController : Controller
    {
        private IPatternRepository _patternRepository;

        public PatternsController(IPatternRepository patternRepository)
        {
            _patternRepository = patternRepository;
        }

        [Route("/api/patterns")]
        public IEnumerable<Pattern> AllPatterns()
        {
            return _patternRepository.GetAll();
        }
    }
}