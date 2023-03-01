using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.PreInvoiceFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.PreInvoiceFeatures.Queries;
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
    public class PreInvoiceController : ControllerBase
    {
        private readonly IMediator mediator;

        public PreInvoiceController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreatePreInvoiceCommand command)
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

            return Created($"/api/preInvoice/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<PreInvoiceDTO>> model = new ResponseViewModel<IEnumerable<PreInvoiceDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllPreInvoicesQuery());
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
            ResponseViewModel<PreInvoiceDTO> model = new ResponseViewModel<PreInvoiceDTO>();
            try
            {
                model.Data = await mediator.Send(new GetPreInvoiceByIdQuery { Id = id });
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
            var preInvoice = await mediator.Send(new GetPreInvoiceByIdQuery { Id = id });
            await mediator.Send(new DeletePreInvoiceByIDCommand { Id = id });
            return Ok($"/api/preInvoice/Delete/{preInvoice}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdatePreInvoiceCommand command)
        {
            command.PreInvoiceID = id;
            if (command.PreInvoiceID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
