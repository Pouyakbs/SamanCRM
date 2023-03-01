using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ComPublicFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ComPublicFeatures.Queries;
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
    public class ComPublicController : ControllerBase
    {
        private readonly IMediator mediator;

        public ComPublicController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateComPublicCommand command)
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

            return Created($"/api/comPublic/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ComPublicDTO>> model = new ResponseViewModel<IEnumerable<ComPublicDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllComPublicsQuery());
            }
            catch (Exception ex)
            {

                model.AddError(ex.Message);
                return BadRequest(model);
            }
            return Ok(model);
        }
        [HttpGet("GetByProgramPart/{id}")]
        public async Task<IActionResult> GetByProgramPartId(int id)
        {
            ResponseViewModel<IEnumerable<ComPublicDTO>> model = new ResponseViewModel<IEnumerable<ComPublicDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetComPublicByProgramPartIDQuery { id = id });
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
            ResponseViewModel<ComPublicDTO> model = new ResponseViewModel<ComPublicDTO>();
            try
            {
                model.Data = await mediator.Send(new GetComPublicByIDQuery { Id = id });
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
            var comPublic = await mediator.Send(new GetComPublicByIDQuery { Id = id });
            await mediator.Send(new DeleteComPublicByIDCommand { Id = id });
            return Ok($"/api/comPublic/Delete/{comPublic}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateComPublicCommand command)
        {
            command.ComPublicID = id;
            if (command.ComPublicID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
