using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Bobbin.Core.Patterns;
using Microsoft.AspNetCore.Mvc;
using Bobbin.Core.Render;

namespace Bobbin.Core.Controllers
{
    [Route("api/render")]
    public class ViewRenderingController : Controller
    {
        private readonly IViewRenderService _viewRenderService;
        private readonly IPatternRepository _patternRepository;
        
        public ViewRenderingController(IViewRenderService viewRenderService, IPatternRepository patternRepository)
        {
            _viewRenderService = viewRenderService;
            _patternRepository = patternRepository;
        }

        [HttpGet("razor")]
        public async Task<IActionResult> RenderView(string viewName)
        {
            if (String.IsNullOrEmpty(viewName))
            {
                return BadRequest();
            }

            var pattern = _patternRepository.Find(viewName);

            if (pattern == null)
            {
                throw new InvalidDataException($"{viewName} is not a registered pattern");
            }
            var result = await _viewRenderService.RenderToStringAsync(pattern.ViewPath("Index"), new object {});
            return Content(result);
        }
        
    }
}