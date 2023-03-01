using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Queries;
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
    public class PersonnelController : ControllerBase
    {
        private readonly IMediator mediator;

        public PersonnelController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreatePersonnelCommand command)
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

            return Created($"/api/personnel/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<PersonnelDTO>> model = new ResponseViewModel<IEnumerable<PersonnelDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllPersonnelsQuery());
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
            ResponseViewModel<PersonnelDTO> model = new ResponseViewModel<PersonnelDTO>();
            try
            {
                model.Data = await mediator.Send(new GetPersonnelByIdQuery { Id = id });
            }
            catch (InvalidOperationException)
            {
                model.AddError("رقیب وجود ندارد");
                return NotFound(model);
            }
            return Ok(model);
        }
        [HttpGet("CheckRole/{id}")]
        public async Task<IActionResult> CheckRole(int id)
        {
            ResponseViewModel<bool> model = new ResponseViewModel<bool>();
            model.Data = await mediator.Send(new CheckRoleByIdQuery { Id = id });
            return Ok(model);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var personnel = await mediator.Send(new GetPersonnelByIdQuery { Id = id });
            await mediator.Send(new DeletePersonnelByIDCommand { Id = id });
            return Ok($"/api/personnel/Delete/{personnel}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdatePersonnelCommand command)
        {
            command.PersonnelID = id;
            if (command.PersonnelID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
