using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.AccountFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.AccountFeatures.Queries;
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
    public class AccountController : ControllerBase
    {
        private readonly IMediator mediator;

        public AccountController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateAccountCommand command)
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

            return Created($"/api/account/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<AccountDTO>> model = new ResponseViewModel<IEnumerable<AccountDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllAccountsQuery());
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
            ResponseViewModel<AccountDTO> model = new ResponseViewModel<AccountDTO>();
            try
            {
                model.Data = await mediator.Send(new GetAccountByIdQuery { Id = id });
            }
            catch (InvalidOperationException)
            {
                model.AddError("رقیب وجود ندارد");
                return NotFound(model);
            }
            return Ok(model);
        }
        [HttpGet("GetByAccount/{id}")]
        public async Task<IActionResult> GetByAccountId(int id)
        {
            ResponseViewModel<IEnumerable<PersonsDTO>> model = new ResponseViewModel<IEnumerable<PersonsDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetPersonsByAccountIDQuery { ID = id });
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
            var meeting = await mediator.Send(new GetAccountByIdQuery { Id = id });
            await mediator.Send(new DeleteAccountByIDCommand { Id = id });
            return Ok($"/api/account/Delete/{meeting}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateAccountCommand command)
        {
            command.AccountID = id;
            if (command.AccountID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
