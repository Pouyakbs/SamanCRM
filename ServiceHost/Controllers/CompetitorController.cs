using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.CompetitorFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.CompetitorFeatures.Queries;
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
    public class CompetitorController : ControllerBase
    {
        private readonly IMediator mediator;

        public CompetitorController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateCompetitorCommand command)
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

            return Created($"/api/competitor/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<CompetitorDTO>> model = new ResponseViewModel<IEnumerable<CompetitorDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllCompetitorsQuery());
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
            ResponseViewModel<CompetitorDTO> model = new ResponseViewModel<CompetitorDTO>();
            try
            {
                model.Data = await mediator.Send(new GetCompetitorByIdQuery { Id = id });
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
            var competitor = await mediator.Send(new GetCompetitorByIdQuery { Id = id });
            await mediator.Send(new DeleteCompetitorByIDCommand { Id = id });
            return Ok($"/api/competitor/Delete/{competitor}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateCompetitorCommand command)
        {
            command.CompetitorID = id;
            if (command.CompetitorID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
