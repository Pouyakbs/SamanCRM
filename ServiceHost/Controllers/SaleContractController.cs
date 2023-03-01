using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.SaleContractFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.SaleContractFeatures.Queries;
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
    public class SaleContractController : ControllerBase
    {
        private readonly IMediator mediator;

        public SaleContractController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateSaleContractCommand command)
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

            return Created($"/api/saleContract/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<SaleContractDTO>> model = new ResponseViewModel<IEnumerable<SaleContractDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllSaleContractsQuery());
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
            ResponseViewModel<SaleContractDTO> model = new ResponseViewModel<SaleContractDTO>();
            try
            {
                model.Data = await mediator.Send(new GetSaleContractByIdQuery { Id = id });
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
            var saleContract = await mediator.Send(new GetSaleContractByIdQuery { Id = id });
            await mediator.Send(new DeleteSaleContractByIDCommand { Id = id });
            return Ok($"/api/saleContract/Delete/{saleContract}");
        }
        [HttpPut("[action]")]
        public async Task<IActionResult> Update(int id, UpdateSaleContractCommand command)
        {
            command.ContractID = id;
            if (command.ContractID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
