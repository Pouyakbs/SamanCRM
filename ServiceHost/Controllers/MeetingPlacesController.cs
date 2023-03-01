using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.MeetingPlacesFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.MeetingPlacesFeatures.Queries;
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
    public class MeetingPlacesController : ControllerBase
    {
        private readonly IMediator mediator;

        public MeetingPlacesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateMeetingPlacesCommand command)
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

            return Created($"/api/meetingPlaces/{model.Data}", model);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            ResponseViewModel<IEnumerable<MeetingPlacesDTO>> model = new ResponseViewModel<IEnumerable<MeetingPlacesDTO>>();
            try
            {
                model.Data = await mediator.Send(new GetAllMeetingPlacesQuery());
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
            ResponseViewModel<MeetingPlacesDTO> model = new ResponseViewModel<MeetingPlacesDTO>();
            try
            {
                model.Data = await mediator.Send(new GetMeetingPlacesByIdQuery { Id = id });
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
            var competitor = await mediator.Send(new GetMeetingPlacesByIdQuery { Id = id });
            await mediator.Send(new DeleteMeetingPlacesByIDCommand { Id = id });
            return Ok($"/api/meetingPlaces/Delete/{competitor}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateMeetingPlacesCommand command)
        {
            command.PlaceID = id;
            if (command.PlaceID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
