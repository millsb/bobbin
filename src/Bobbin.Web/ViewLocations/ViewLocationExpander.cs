using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Razor;

namespace Bobbin.Web.ViewLocations
{
    public class ViewLocationExpander : IViewLocationExpander
    {
        public void PopulateValues(ViewLocationExpanderContext context) {
            context.Values["customviewlocation"] = nameof(ViewLocationExpander);
        }

        public virtual IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, 
            IEnumerable<string> viewLocations)
        {
            var newPaths = new[] 
            {
                "~/StyleGuide/{1}/{0}/{0}.cshtml",
            };

            return newPaths.Concat(viewLocations).ToArray();
        }

    }
}