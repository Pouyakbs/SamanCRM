using MediatR;
using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.ApplicationService.Features.ActivitiesFeatures.Commands;
using SamanCRM.Core.ApplicationService.Features.ActivitiesFeatures.Queries;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;
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
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ActivitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateActivityCommand command)
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

            return Created($"/api/activities/{model.Data}", model);
        }
        [HttpGet("{entityType}")]
        public async Task<IActionResult> GetAll(string entityType)
        {
            ResponseViewModel<IEnumerable<ActivitiesDetail>> model = new ResponseViewModel<IEnumerable<ActivitiesDetail>>();
            try
            {
                model.Data = await mediator.Send(new GetAllActivitiesQuery { EntityType = entityType});
            }
            catch (Exception ex)
            {

                model.AddError(ex.Message);
                return BadRequest(model);
            }
            return Ok(model);
        }
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            ResponseViewModel<ActivitiesDTO> model = new ResponseViewModel<ActivitiesDTO>();
            try
            {
                model.Data = await mediator.Send(new GetActivityByIdQuery { Id = id });
            }
            catch (InvalidOperationException)
            {
                model.AddError("رقیب وجود ندارد");
                return NotFound(model);
            }
            return Ok(model);
        }
        [HttpGet("GetByPersonnel/{entityType}/{id}")]
        public async Task<IActionResult> GetByPersonnel(string entityType , int id)
        {
            ResponseViewModel<IEnumerable<ActivitiesDetail>> model = new ResponseViewModel<IEnumerable<ActivitiesDetail>>();
            try
            {
                model.Data = await mediator.Send(new GetActivitiesByPersonnelQuery { EntityType = entityType , PersonnelID = id });
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
            var analysis = await mediator.Send(new GetActivityByIdQuery { Id = id });
            await mediator.Send(new DeleteActivityByIDCommand { Id = id });
            return Ok($"/api/activities/Delete/{analysis}");
        }
        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> Update(int id, UpdateActivityCommand command)
        {
            command.ActivityID = id;
            if (command.ActivityID == 0)
            {
                return BadRequest("ID Not Found");
            }
            await mediator.Send(command);
            return Ok(command);
        }
    }
}
