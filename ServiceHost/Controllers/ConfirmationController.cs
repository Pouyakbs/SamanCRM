using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ConfirmationFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ConfirmationFeatures.Queries;
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
    public class ConfirmationController : ControllerBase
    {
        private readonly IMediator mediator;

        public ConfirmationController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateConfirmationCommand command)
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

            return Created($"/api/confirmation/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ConfirmationDTO>> model = new ResponseViewModel<IEnumerable<ConfirmationDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllConfirmationsQuery());
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
            ResponseViewModel<ConfirmationDTO> model = new ResponseViewModel<ConfirmationDTO>();
            try
            {
                model.Data = await mediator.Send(new GetConfirmationByIdQuery { Id = id });
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
            var meeting = await mediator.Send(new GetConfirmationByIdQuery { Id = id });
            await mediator.Send(new DeleteConfirmationByIDCommand { Id = id });
            return Ok($"/api/confirmation/Delete/{meeting}");
        }
        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateConfirmationCommand command)
        {
            if (command.ConfirmationID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
