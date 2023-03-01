using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.OpportunitiesFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.OpportunitiesFeatures.Queries;
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
    public class OpportunitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public OpportunitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateOpportunitiesCommand command)
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
            return Created($"/api/opportunities/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<OpportunitiesDTO>> model = new ResponseViewModel<IEnumerable<OpportunitiesDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllOpportunitiesQuery());
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
            ResponseViewModel<OpportunitiesDTO> model = new ResponseViewModel<OpportunitiesDTO>();
            try
            {
                model.Data = await mediator.Send(new GetOpportunitiesByIdQuery { Id = id });
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
            var opportunities = await mediator.Send(new GetOpportunitiesByIdQuery { Id = id });
            await mediator.Send(new DeleteOpportunitiesByIDCommand { Id = id });
            return Ok($"/api/opportunities/Delete/{opportunities}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateOpportunitiesCommand command)
        {
            command.OpportunityID = id;
            if (command.OpportunityID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
