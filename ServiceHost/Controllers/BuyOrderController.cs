using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.BuyOrderFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.BuyOrderFeatures.Queries;
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
    public class BuyOrderController : ControllerBase
    {
        private readonly IMediator mediator;

        public BuyOrderController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateBuyOrderCommand command)
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

            return Created($"/api/buyOrder/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<BuyOrderDTO>> model = new ResponseViewModel<IEnumerable<BuyOrderDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllBuyOrdersQuery());
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
            ResponseViewModel<BuyOrderDTO> model = new ResponseViewModel<BuyOrderDTO>();
            try
            {
                model.Data = await mediator.Send(new GetBuyOrderByIdQuery { Id = id });
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
            var meeting = await mediator.Send(new GetBuyOrderByIdQuery { Id = id });
            await mediator.Send(new DeleteBuyOrderByIDCommand { Id = id });
            return Ok($"/api/buyOrder/Delete/{meeting}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateBuyOrderCommand command)
        {
            command.OrderID = id;
            if (command.OrderID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
