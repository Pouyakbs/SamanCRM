using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ServicesFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ServicesFeatures.Queries;
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
    public class ServicesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ServicesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateServiceCommand command)
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

            return Created($"/api/services/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ServicesDTO>> model = new ResponseViewModel<IEnumerable<ServicesDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllServicesQuery());
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
            ResponseViewModel<ServicesDTO> model = new ResponseViewModel<ServicesDTO>();
            try
            {
                model.Data = await mediator.Send(new GetServiceByIdQuery { Id = id });
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
            var analysis = await mediator.Send(new GetServiceByIdQuery { Id = id });
            await mediator.Send(new DeleteServiceByIDCommand { Id = id });
            return Ok($"/api/services/Delete/{analysis}");
        }
        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateServiceCommand command)
        {
            command.ServiceID = id;
            if (command.ServiceID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
