using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IProjectFacade
    {
        ProjectDTO GetById(int id);
        IEnumerable<ProjectDTO> GetAll();
        int Add(ProjectDTO entity);
        void Remove(ProjectDTO entity);
        void Update(ProjectDTO entity);
    }
}
