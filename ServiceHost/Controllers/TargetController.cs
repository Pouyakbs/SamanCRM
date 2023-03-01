using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.TargetFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.TargetFeatures.Queries;
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
    public class TargetController : ControllerBase
    {
        private readonly IMediator mediator;

        public TargetController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateTargetCommand command)
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

            return Created($"/api/target/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<TargetDTO>> model = new ResponseViewModel<IEnumerable<TargetDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllTargetsQuery());
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
            ResponseViewModel<TargetDTO> model = new ResponseViewModel<TargetDTO>();
            try
            {
                model.Data = await mediator.Send(new GetTargetByIdQuery { Id = id });
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
            var target = await mediator.Send(new GetTargetByIdQuery { Id = id });
            await mediator.Send(new DeleteTargetByIDCommand { Id = id });
            return Ok($"/api/target/Delete/{target}");
        }
        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateTargetCommand command)
        {
            command.TargetID = id;
            if (command.TargetID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
