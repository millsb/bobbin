using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Bobbin.Web.Patterns
{

    public class Pattern
    {

        [Required]
        public string FolderPath { get; set; }
        
        [Required]
        public string ShortName { get; set; }
        
        [Required]
        public string BucketName { get; set; }
        
        [Required]
        public string DisplayName { get; set; }
        
        public string ViewPath(string viewName)
        {
            return Path.Combine(FolderPath, $"{viewName}.cshtml");
        }

    }

}