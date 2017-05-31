using System.Threading.Tasks;

namespace Bobbin.Core.Render 
{
    public interface IViewRenderService
    {
        Task<string> RenderToStringAsync(string viewFilePath, object model);
    }
}