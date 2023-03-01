using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.EF;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ProgramPartFacade : IProgramPartFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;
        private readonly DemoContext context;

        public ProgramPartFacade(IUnitOfWork unitofWork, IMapper mapper , DemoContext context)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
            this.context = context;
        }
        public int Add(ProgramPartDTO entity)
        {
            ProgramPart programPartDTO = mapper.Map<ProgramPartDTO, ProgramPart>(entity);
            ApplicationRole applicationRole = unitofWork.ApplicationRoles.GetById(programPartDTO.RoleID);
            List<RoleProgramPart> roleProgramPart = new List<RoleProgramPart>();
            roleProgramPart.Add(new RoleProgramPart() { RoleID = applicationRole.RoleID });
            programPartDTO.RoleProgramParts = roleProgramPart;
            unitofWork.ProgramPart.Add(programPartDTO);
            unitofWork.Save();
            return programPartDTO.ID;
        }

        public IEnumerable<ProgramPartDTO> GetAll()
        {
            IEnumerable<ProgramPart> programPart = unitofWork.ProgramPart.GetAll();
            IEnumerable<ProgramPartDTO> programPartDTO = mapper.Map<IEnumerable<ProgramPart>, IEnumerable<ProgramPartDTO>>(programPart);
            return programPartDTO;
        }

        public ProgramPartDTO GetById(int id)
        {
            ProgramPart programPart = unitofWork.ProgramPart.GetById(id);
            ProgramPartDTO programPartDTO = mapper.Map<ProgramPart, ProgramPartDTO>(programPart);
            return programPartDTO;
        }

        public IEnumerable<ProgramPartDTO> GetByRoleID(int id)
        {
            IEnumerable<ProgramPart> programPart = unitofWork.ProgramPart.GetAllPrograms().Where(a => a.RoleProgramParts.FindAll(a => a.RoleID == id).Any()).ToList();
            IEnumerable<ProgramPartDTO> programPartDTO = mapper.Map<IEnumerable<ProgramPart>, IEnumerable<ProgramPartDTO>>(programPart);
            return programPartDTO;
        }

        public void Remove(ProgramPartDTO entity)
        {
            ProgramPart programPartDTO = mapper.Map<ProgramPartDTO, ProgramPart>(entity);
            ProgramPartDTO programPart = GetById(programPartDTO.ID);
            unitofWork.ProgramPart.Remove(programPartDTO);
            unitofWork.Save();
        }

        public void Update(ProgramPartDTO entity)
        {
            ProgramPart programPartDTO = mapper.Map<ProgramPartDTO, ProgramPart>(entity);
            unitofWork.ProgramPart.Update(programPartDTO);
            unitofWork.Save();
        }
        public void UpdateAccess(ProgramPartDTO entity)
        {
            ProgramPart programPartDTO = mapper.Map<ProgramPartDTO, ProgramPart>(entity);
            ProgramPart roleProgramParts = unitofWork.ProgramPart.GetByRoleID(programPartDTO.RoleID).Where(a => a.RoleProgramParts.FindAll(a => a.RoleID == programPartDTO.RoleID).Any()).FirstOrDefault(a => a.DisplayName == programPartDTO.DisplayName);
            // Update Access of Parent with It's Children
            if (programPartDTO.ParentID == 0)
            {
                if (roleProgramParts != null)
                {

                    var roleProgram = roleProgramParts.RoleProgramParts.FirstOrDefault(x => x.RoleID == programPartDTO.RoleID);
                    if (roleProgram != null)
                    {
                        roleProgramParts.RoleProgramParts.Remove(roleProgram);
                        context.Entry(roleProgram).State = EntityState.Deleted;
                        context.SaveChanges();
                    }
                }
                else
                {
                    List<RoleProgramPart> roleProgramPart = new List<RoleProgramPart>();
                    roleProgramPart.Add(new RoleProgramPart() { RoleID = programPartDTO.RoleID, ProgramPart = programPartDTO });
                    programPartDTO.RoleProgramParts = roleProgramPart;
                    unitofWork.ProgramPart.Update(programPartDTO);
                    unitofWork.Save();
                }
                IEnumerable<ProgramPart> programPart = unitofWork.ProgramPart.GetAll().Where(a => a.ParentID == programPartDTO.ID);
                foreach (var item in programPart)
                {
                    ProgramPart childRoleProgramParts = unitofWork.ProgramPart.GetByRoleID(item.RoleID).Find(a=> a.DisplayName == item.DisplayName);
                    if (childRoleProgramParts != null)
                    {

                        var roleProgram = childRoleProgramParts.RoleProgramParts.FirstOrDefault(x => x.RoleID == programPartDTO.RoleID);
                        if (roleProgram != null)
                        {
                            childRoleProgramParts.RoleProgramParts.Remove(roleProgram);
                            context.Entry(roleProgram).State = EntityState.Deleted;
                            context.SaveChanges();
                        }
                        else
                        {
                            List<RoleProgramPart> roleProgramPart = new List<RoleProgramPart>();
                            roleProgramPart.Add(new RoleProgramPart() { RoleID = programPartDTO.RoleID, ProgramPart = item });
                            item.RoleProgramParts = roleProgramPart;
                            unitofWork.ProgramPart.Update(item);
                            unitofWork.Save();
                        }
                    }
                }
               
            }
            // Update Access Level of a Child Without Parent
            else if (programPartDTO.ParentID != 0)
            {
                if (roleProgramParts != null)
                {

                    var roleProgram = roleProgramParts.RoleProgramParts.FirstOrDefault(x => x.RoleID == programPartDTO.RoleID);
                    if (roleProgram != null)
                    {
                        roleProgramParts.RoleProgramParts.Remove(roleProgram);
                        context.Entry(roleProgram).State = EntityState.Deleted;
                        context.SaveChanges();
                    }
                }
                else
                {
                    List<RoleProgramPart> roleProgramPart = new List<RoleProgramPart>();
                    roleProgramPart.Add(new RoleProgramPart() { RoleID = programPartDTO.RoleID, ProgramPart = programPartDTO });
                    programPartDTO.RoleProgramParts = roleProgramPart;
                    unitofWork.ProgramPart.Update(programPartDTO);
                    unitofWork.Save();
                }
            }
        }
    }
}
