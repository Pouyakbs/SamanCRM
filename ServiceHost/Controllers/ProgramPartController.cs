using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ProgramPartFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ProgramPartFeatures.Queries;
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
    public class ProgramPartController : ControllerBase
    {
        private readonly IMediator mediator;

        public ProgramPartController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateProgramPartCommand command)
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

            return Created($"/api/programPart/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ProgramPartDTO>> model = new ResponseViewModel<IEnumerable<ProgramPartDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllProgramPartsQuery());
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
            ResponseViewModel<ProgramPartDTO> model = new ResponseViewModel<ProgramPartDTO>();
            try
            {
                model.Data = await mediator.Send(new GetProgramPartByIdQuery { Id = id });
            }
            catch (InvalidOperationException)
            {
                model.AddError("رقیب وجود ندارد");
                return NotFound(model);
            }
            return Ok(model);
        }
        [HttpGet("GetByRoleId/{id}")]
        public async Task<IActionResult> GetByRoleId(int id)
        {
            ResponseViewModel<IEnumerable<ProgramPartDTO>> model = new ResponseViewModel<IEnumerable<ProgramPartDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetProgramPartByRoleIDQuery { Id = id });
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
            var programPart = await mediator.Send(new GetProgramPartByIdQuery { Id = id });
            await mediator.Send(new DeleteProgramPartByIDCommand { Id = id });
            return Ok($"/api/programPart/Delete/{programPart}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateProgramPartCommand command)
        {
            command.ID = id;
            if (command.ID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateAccess(int id, UpdateProgramPartAccessCommand command)
        {
            command.RoleID = id;
            if (command.ID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }

    }
}
