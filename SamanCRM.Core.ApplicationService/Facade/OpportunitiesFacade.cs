using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class OpportunitiesFacade : IOpportunitiesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public OpportunitiesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(OpportunitiesDTO entity)
        {
            Opportunities opportunitiesDTO = mapper.Map<OpportunitiesDTO, Opportunities>(entity);
            List<OpportunitiesCampaign> opportunitiesCampaigns = new List<OpportunitiesCampaign>();
            // Add To Many to Many Table
            foreach (var item in entity.CampaignsID)
            {
                OpportunitiesCampaign campaign = JsonSerializer.Deserialize<OpportunitiesCampaign>(item); ;
                opportunitiesCampaigns.Add(new OpportunitiesCampaign() { CampaignID = campaign.CampaignID });
            }
            opportunitiesDTO.OpportunitiesCampaigns = opportunitiesCampaigns;
            List<OpportunitiesProducts> opportunitiesProducts = new List<OpportunitiesProducts>();
            // Add To Many to Many Table
            foreach (var item in entity.ProductsID)
            {
                int productID = Int32.Parse(item);
                opportunitiesProducts.Add(new OpportunitiesProducts() { ProductsID = productID });
            }
            opportunitiesDTO.OpportunitiesProducts = opportunitiesProducts;
            unitofWork.Opportunities.Add(opportunitiesDTO);
            unitofWork.Save();
            return opportunitiesDTO.OpportunityID;
        }

        public IEnumerable<OpportunitiesDTO> GetAll()
        {
            IEnumerable<Opportunities> opportunities = unitofWork.Opportunities.GetAll();
            IEnumerable<OpportunitiesDTO> opportunitiesDTO = mapper.Map<IEnumerable<Opportunities>, IEnumerable<OpportunitiesDTO>>(opportunities);
            return opportunitiesDTO;
        }

        public OpportunitiesDTO GetById(int id)
        {
            Opportunities opportunities = unitofWork.Opportunities.GetById(id);
            OpportunitiesDTO opportunitiesDTO = mapper.Map<Opportunities, OpportunitiesDTO>(opportunities);
            return opportunitiesDTO;
        }

        public void Remove(OpportunitiesDTO entity)
        {
            Opportunities opportunitiesDTO = mapper.Map<OpportunitiesDTO, Opportunities>(entity);
            unitofWork.Opportunities.Remove(opportunitiesDTO);
            unitofWork.Save();
        }

        public void Update(OpportunitiesDTO entity)
        {
            Opportunities opportunitiesDTO = mapper.Map<OpportunitiesDTO, Opportunities>(entity);
            OpportunitiesDTO opportunities = GetById(opportunitiesDTO.OpportunityID);
            opportunitiesDTO.CreatedDate = opportunities.CreatedDate;
            unitofWork.Opportunities.Update(opportunitiesDTO);
            unitofWork.Save();
        }
    }
}
