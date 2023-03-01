using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.AccountFeatures.Queries;
using SamanCRM.Core.ApplicationService.Features.PersonsFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.PersonsFeatures.Queries;
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
    public class PersonsController : ControllerBase
    {
        private readonly IMediator mediator;

        public PersonsController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreatePersonCommand command)
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

            return Created($"/api/person/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<PersonsDTO>> model = new ResponseViewModel<IEnumerable<PersonsDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllPersonsQuery());
                foreach (var item in model.Data)
                {
                    AccountDTO account = await mediator.Send(new GetAccountByIdQuery { Id = item.AccountID });
                    item.AccountName = account.Name;
                }
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
            ResponseViewModel<PersonsDTO> model = new ResponseViewModel<PersonsDTO>();
            try
            {
                model.Data = await mediator.Send(new GetPersonByIdQuery { Id = id });
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
            var person = await mediator.Send(new GetPersonByIdQuery { Id = id });
            await mediator.Send(new DeletePersonByIDCommand { Id = id });
            return Ok($"/api/person/Delete/{person}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdatePersonCommand command)
        {
            command.PersonID = id;
            if (command.PersonID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
