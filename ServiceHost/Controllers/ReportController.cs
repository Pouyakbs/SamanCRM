using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ReportFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ReportFeatures.Queries;
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
    public class ReportController : ControllerBase
    {
        private readonly IMediator mediator;

        public ReportController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateReportCommand command)
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

            return Created($"/api/report/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ReportDTO>> model = new ResponseViewModel<IEnumerable<ReportDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllReportsQuery());
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
            ResponseViewModel<ReportDTO> model = new ResponseViewModel<ReportDTO>();
            try
            {
                model.Data = await mediator.Send(new GetReportByIdQuery { Id = id });
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
            var report = await mediator.Send(new GetReportByIdQuery { Id = id });
            await mediator.Send(new DeleteReportByIDCommand { Id = id });
            return Ok($"/api/report/Delete/{report}");
        }
        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateReportCommand command)
        {
            command.ReportID = id;
            if (command.ReportID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
