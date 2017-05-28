using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;

namespace Bobbin.Web.Patterns
{
    public interface IPatternRepository
    {
        Pattern Find(string shortName);
        IEnumerable<Pattern> GetAll();
    }
    
    public class PatternRepository : IPatternRepository
    {
        private PatternRepositoryOptions _options;
        private IHostingEnvironment _hostingEnvironment;
        private DirectoryInfo _rootDirectory;
        private IList<Pattern> _cachedPatterns;

        public PatternRepository(IOptions<PatternRepositoryOptions> optionsAccessor, IHostingEnvironment hostingEnvironment)
        {
            _options = optionsAccessor.Value;
            _hostingEnvironment = hostingEnvironment;
            _usePatternsDirectory(_options.PatternsRoot);
            _cachedPatterns = new List<Pattern>();
        }

        private void _usePatternsDirectory(string rootPath)
        {
            _rootDirectory = new DirectoryInfo(rootPath);
            
            if (!_rootDirectory.Exists)
            {
                throw new InvalidDataException($"Directory {_rootDirectory} does not exist, or is not a valid pattern module directory.");
            }
        }

        public Pattern Find(string shortName)
        {
            _doBuildIfNeeded();
            return _cachedPatterns.FirstOrDefault(p => p.ShortName.ToLower() == shortName.ToLower());
        }

        public IEnumerable<Pattern> GetAll()
        {
            _doBuildIfNeeded();
            return _cachedPatterns;
        }

        private void _doBuildIfNeeded()
        {
            if (_cachedPatterns == null || !_cachedPatterns.Any())
            {
                _buildAllPatterns();
            }
        }

        private void _buildAllPatterns()
        {
            if (_rootDirectory == null)
            {
                throw new InvalidDataException("Cannot build patterns. No pattern directory specified!");
            }
            
            Directory.EnumerateDirectories(_rootDirectory.FullName)
                .SelectMany(Directory.EnumerateDirectories)
                .ToList()
                .ForEach( p => _buildPattern(p) );
        }
            
        private void _buildPattern(string fullPath)
        {
            var info = new DirectoryInfo(fullPath);
            var virtualPath = fullPath.Replace(_hostingEnvironment.ContentRootPath, "~");
            
            _cachedPatterns.Add(new Pattern() { 
                FolderPath = virtualPath,
                ShortName = _generateShortName(info.Parent.Name, info.Name)
            });
            
        }

        private static string _generateShortName(string parentDirName, string dirName)
        {
            return $"{parentDirName}-{dirName}";
        }
    }
}