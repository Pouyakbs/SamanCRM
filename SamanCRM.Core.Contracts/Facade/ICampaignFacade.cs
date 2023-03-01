using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ICampaignFacade
    {
        CampaignDTO GetById(int id);
        IEnumerable<CampaignDTO> GetAll();
        int Add(CampaignDTO entity);
        void Remove(CampaignDTO entity);
        void Update(CampaignDTO entity);
    }

}
