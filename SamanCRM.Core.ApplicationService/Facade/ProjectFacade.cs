using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ProjectFacade : IProjectFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ProjectFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ProjectDTO entity)
        {
            Project projectDTO = mapper.Map<ProjectDTO, Project>(entity);
            unitofWork.Project.Add(projectDTO);
            unitofWork.Save();
            return projectDTO.ProjectID;
        }

        public IEnumerable<ProjectDTO> GetAll()
        {
            IEnumerable<Project> project = unitofWork.Project.GetAll();
            IEnumerable<ProjectDTO> projectDTO = mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDTO>>(project);
            return projectDTO;
        }

        public ProjectDTO GetById(int id)
        {
            Project project = unitofWork.Project.GetById(id);
            ProjectDTO projectDTO = mapper.Map<Project, ProjectDTO>(project);
            return projectDTO;
        }

        public void Remove(ProjectDTO entity)
        {
            Project projectDTO = mapper.Map<ProjectDTO, Project>(entity);
            unitofWork.Project.Remove(projectDTO);
            unitofWork.Save();
        }

        public void Update(ProjectDTO entity)
        {
            Project projectDTO = mapper.Map<ProjectDTO, Project>(entity);
            ProjectDTO project = GetById(projectDTO.ProjectID);
            projectDTO.CreatedDate = project.CreatedDate;
            unitofWork.Project.Update(projectDTO);
            unitofWork.Save();
        }
    }
}
