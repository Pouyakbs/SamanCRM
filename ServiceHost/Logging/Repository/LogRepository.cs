using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ServiceHost.Logging.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceHost.Logging.Repository
{
    public class LogRepository : ActionFilterAttribute, ILogRepository
    {
        private readonly ILogger logger;
        public LogRepository(ILoggerFactory loggerFactory)
        {
            logger = loggerFactory.CreateLogger("LoggingActionFilter");
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            logger.LogInformation($"Action of {context.ActionDescriptor.RouteValues["action"]} in Controller {context.ActionDescriptor.RouteValues["controller"]} is Executing");
            base.OnActionExecuting(context);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            logger.LogInformation($"Action of {context.ActionDescriptor.RouteValues["action"]} in Controller {context.ActionDescriptor.RouteValues["controller"]} is Executed");
            base.OnActionExecuted(context);
        }

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            logger.LogInformation($"Action of {context.ActionDescriptor.RouteValues["action"]} in Controller {context.ActionDescriptor.RouteValues["controller"]}'s Result is Executing");

            if (context.Result != null)
            {
                var resultMsg = context.Result;
                if (resultMsg is JsonResult json)
                {
                    logger.LogInformation("JSON Serializer Setting: " + json.SerializerSettings);
                    logger.LogInformation("JSON Content Type: " + json.ContentType);
                    logger.LogInformation("JSON Status Code: " + json.StatusCode);
                    logger.LogInformation("JSON Value: " + JsonConvert.SerializeObject(json.Value));
                }

                if (resultMsg is ViewResult view)
                {
                    logger.LogInformation("View Name: " + view.ViewName);
                    logger.LogInformation("View Status: " + view.StatusCode);
                    logger.LogInformation("View ContentTpye:" + view.ContentType);
                    logger.LogInformation("View Data: " + JsonConvert.SerializeObject(view.ViewData));
                    logger.LogInformation("View Data Model: " + JsonConvert.SerializeObject(view.ViewData.Model));
                    logger.LogInformation("Temp Data: " + JsonConvert.SerializeObject(view.TempData));
                }

            }
            base.OnResultExecuting(context);
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            logger.LogInformation($"Action of {context.ActionDescriptor.RouteValues["action"]} in Controller {context.ActionDescriptor.RouteValues["controller"]}'s Result is Executed");
            base.OnResultExecuted(context);
        }
    }
}
