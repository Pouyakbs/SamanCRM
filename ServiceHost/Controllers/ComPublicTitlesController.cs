using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ComPublicTitles.Commands;
using SamanCRM.Core.ApplicationService.Features.ComPublicTitles.Queries;
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
    public class ComPublicTitlesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ComPublicTitlesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateComPublicTitlesCommand command)
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

            return Created($"/api/branch/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<ComPublicTitlesDTO>> model = new ResponseViewModel<IEnumerable<ComPublicTitlesDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllComPublicTitlesQuery());
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
            ResponseViewModel<ComPublicTitlesDTO> model = new ResponseViewModel<ComPublicTitlesDTO>();
            try
            {
                model.Data = await mediator.Send(new GetComPublicTitlesByIDQuery { Id = id });
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
            var comPublicTitles = await mediator.Send(new GetComPublicTitlesByIDQuery { Id = id });
            await mediator.Send(new DeleteComPublicTitlesByIDCommand { Id = id });
            return Ok($"/api/comPublicTitles/Delete/{comPublicTitles}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateComPublicTitlesCommand command)
        {
            command.TitleID = id;
            if (command.TitleID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
