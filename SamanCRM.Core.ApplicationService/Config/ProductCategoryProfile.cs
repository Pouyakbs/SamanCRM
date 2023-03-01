using AutoMapper;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;

namespace SamanCRM.Core.ApplicationService.Config
{
    public class ProductCategoryProfile : Profile
    {
        public ProductCategoryProfile()
        {
            CreateMap<ProductCategory, ProductCategoryDTO>();
            CreateMap<ProductCategoryDTO, ProductCategory>();
        }
    }
}
