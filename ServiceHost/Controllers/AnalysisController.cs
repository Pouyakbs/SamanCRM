using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.AnalysisFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.AnalysisFeatures.Queries;
using SamanCRM.Shared.DomainModels.DTOs;
using ServiceHost.Logging.Interface;
using ServiceHost.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServiceHost.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ServiceFilter(typeof(ILogRepository))]
    public class AnalysisController : ControllerBase
    {
        private readonly IMediator mediator;

        public AnalysisController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateAnalysisCommand command)
        {
            ResponseViewModel<int> model = new ResponseViewModel<int>();
            try
            {
                model.Data = await mediator.Send(command);
            }
            catch (Exception ex)
            {
                model.AddError(ex.Message);
                return BadRequest(model);
            }

            return Created($"/api/analysis/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<AnalysisDTO>> model = new ResponseViewModel<IEnumerable<AnalysisDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllAnalysisQuery());
            }
            catch (Exception ex)
            {

                model.AddError(ex.Message);
                return BadRequest(model);
            }
            return Ok(model);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            ResponseViewModel<AnalysisDTO> model = new ResponseViewModel<AnalysisDTO>();
            try
            {
                model.Data = await mediator.Send(new GetAnalysisByIdQuery { Id = id });
            }
            catch (InvalidOperationException)
            {
                model.AddError("رقیب وجود ندارد");
                return NotFound(model);
            }
            return Ok(model);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var analysis = await mediator.Send(new GetAnalysisByIdQuery { Id = id });
            await mediator.Send(new DeleteAnalysisByIDCommand { Id = id });
            return Ok($"/api/analysis/Delete/{analysis}");
        }
        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateAnalysisCommand command)
        {
            command.AnalysisID = id;
            if (command.AnalysisID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
