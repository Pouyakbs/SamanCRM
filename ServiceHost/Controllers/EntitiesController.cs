using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.EntitiesFacade.Commands;
using SamanCRM.Core.ApplicationService.Features.EntitiesFacade.Queries;
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
    public class EntitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public EntitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateEntitiesCommand command)
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

            return Created($"/api/entities/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<EntitiesDTO>> model = new ResponseViewModel<IEnumerable<EntitiesDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllEntitiesQuery());
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
            ResponseViewModel<EntitiesDTO> model = new ResponseViewModel<EntitiesDTO>();
            try
            {
                model.Data = await mediator.Send(new GetEntitiesByIdQuery { Id = id });
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
            var entities = await mediator.Send(new GetEntitiesByIdQuery { Id = id });
            await mediator.Send(new DeleteEntitiesByIDCommand { Id = id });
            return Ok($"/api/entities/Delete/{entities}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateEntitiesCommand command)
        {
            command.EntitiesID = id;
            if (command.EntitiesID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
