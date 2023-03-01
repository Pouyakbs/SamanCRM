using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ApplicationSettingsFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ApplicationSettingsFeatures.Queries;
using SamanCRM.Core.Contracts.Facade;
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
    public class ApplicationSettingsController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly IApplicationSettingsFacade applicationSettingsFacade;

        public ApplicationSettingsController(IMediator mediator , IApplicationSettingsFacade applicationSettingsFacade)
        {
            this.mediator = mediator;
            this.applicationSettingsFacade = applicationSettingsFacade;
        }
        [HttpPost]
        public async Task<IActionResult> Create(List<ApplicationSettingsDTO> command)
        {
            ResponseViewModel<Object> model = new ResponseViewModel<Object>();
            try
            {
                model.Data = applicationSettingsFacade.Add(command);
            }
            catch (Exception ex)
            {
                model.AddError(ex.Message);
                return BadRequest(model);
            }
            return Created($"/api/applicationSettings/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ApplicationSettingsDTO>> model = new ResponseViewModel<IEnumerable<ApplicationSettingsDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllApplicationSettingsQuery());
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
            ResponseViewModel<ApplicationSettingsDTO> model = new ResponseViewModel<ApplicationSettingsDTO>();
            try
            {
                model.Data = await mediator.Send(new GetApplicationSettingsByIdQuery { Id = id });
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
            var applicationSettings = await mediator.Send(new GetApplicationSettingsByIdQuery { Id = id });
            await mediator.Send(new DeleteApplicationSettingsByIDCommand { Id = id });
            return Ok($"/api/applicationSettings/Delete/{applicationSettings}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateApplicationSettingsCommand command)
        {
            command.SettingID = id;
            if (command.SettingID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
