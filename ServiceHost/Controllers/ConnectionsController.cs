using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ConnectionsFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ConnectionsFeatures.Queries;
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
    public class ConnectionsController : ControllerBase
    {
        private readonly IMediator mediator;

        public ConnectionsController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateConnectionsCommand command)
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

            return Created($"/api/connections/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ConnectionsDTO>> model = new ResponseViewModel<IEnumerable<ConnectionsDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllConnectionsQuery());
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
            ResponseViewModel<ConnectionsDTO> model = new ResponseViewModel<ConnectionsDTO>();
            try
            {
                model.Data = await mediator.Send(new GetConnectionsByIdQuery { Id = id });
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
            var personnel = await mediator.Send(new GetConnectionsByIdQuery { Id = id });
            await mediator.Send(new DeleteConnectionsByIDCommand { Id = id });
            return Ok($"/api/connections/Delete/{personnel}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateConnectionsCommand command)
        {
            command.ConnectionsID = id;
            if (command.ConnectionsID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
