using AutoMapper;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<Project, ProjectDTO>();
            CreateMap<ProjectDTO, Project>();
        }
    }
}
