using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.InvoiceFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.InvoiceFeatures.Queries;
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
    public class InvoiceController : ControllerBase
    {
        private readonly IMediator mediator;

        public InvoiceController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateInvoiceCommand command)
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

            return Created($"/api/invoice/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<InvoiceDTO>> model = new ResponseViewModel<IEnumerable<InvoiceDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllInvoicesQuery());
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
            ResponseViewModel<InvoiceDTO> model = new ResponseViewModel<InvoiceDTO>();
            try
            {
                model.Data = await mediator.Send(new GetInvoiceByIdQuery { Id = id });
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
            var invoice = await mediator.Send(new GetInvoiceByIdQuery { Id = id });
            await mediator.Send(new DeleteInvoiceByIDCommand { Id = id });
            return Ok($"/api/invoice/Delete/{invoice}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateInvoiceCommand command)
        {
            command.InvoiceID = id;
            if (command.InvoiceID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
