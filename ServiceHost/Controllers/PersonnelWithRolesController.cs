using Microsoft.AspNetCore.Mvc;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using ServiceHost.Logging.Interface;
using ServiceHost.Models;
using System;
using System.Collections.Generic;

namespace ServiceHost.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ServiceFilter(typeof(ILogRepository))]
    public class PersonnelWithRolesController : ControllerBase
    {
        private readonly IPersonnelWithRolesFacade personnelWithRoles;

        public PersonnelWithRolesController(IPersonnelWithRolesFacade personnelWithRoles)
        {
            this.personnelWithRoles = personnelWithRoles;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            ResponseViewModel<IEnumerable<PersonnelsWithRolesDTO>> model = new ResponseViewModel<IEnumerable<PersonnelsWithRolesDTO>>();
            try
            {
                model.Data = personnelWithRoles.GetAllPersonnelsWithRoles();
            }
            catch (Exception ex)
            {

                model.AddError(ex.Message);
                return BadRequest(model);
            }
            return Ok(model);
        }
    }
}
