using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class CampaignFacade : ICampaignFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public CampaignFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(CampaignDTO entity)
        {
            Campaign campaignDTO = mapper.Map<CampaignDTO, Campaign>(entity);
            unitofWork.Campaign.Add(campaignDTO);
            unitofWork.Save();
            return campaignDTO.CampaignID;
        }

        public IEnumerable<CampaignDTO> GetAll()
        {
            IEnumerable<Campaign> campaign = unitofWork.Campaign.GetAll();
            IEnumerable<CampaignDTO> campaignDTO = mapper.Map<IEnumerable<Campaign>, IEnumerable<CampaignDTO>>(campaign);
            return campaignDTO;
        }

        public CampaignDTO GetById(int id)
        {
            Campaign campaign = unitofWork.Campaign.GetById(id);
            CampaignDTO campaignDTO = mapper.Map<Campaign, CampaignDTO>(campaign);
            return campaignDTO;
        }

        public void Remove(CampaignDTO entity)
        {
            Campaign campaignDTO = mapper.Map<CampaignDTO, Campaign>(entity);
            unitofWork.Campaign.Remove(campaignDTO);
            unitofWork.Save();
        }

        public void Update(CampaignDTO entity)
        {
            Campaign campaignDTO = mapper.Map<CampaignDTO, Campaign>(entity);
            CampaignDTO campaign = GetById(campaignDTO.CampaignID);
            campaignDTO.CreatedDate = campaign.CreatedDate;
            unitofWork.Campaign.Update(campaignDTO);
            unitofWork.Save();
        }
    }
}
