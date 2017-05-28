using System.Threading.Tasks;

namespace Bobbin.Web.Render 
{
    public interface IViewRenderService
    {
        Task<string> RenderToStringAsync(string viewFilePath, object model);
    }
}