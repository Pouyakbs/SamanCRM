using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ProductCategoryFacade : IProductCategoryFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ProductCategoryFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ProductCategoryDTO entity)
        {
            ProductCategory productCategoryDTO = mapper.Map<ProductCategoryDTO, ProductCategory>(entity);
            unitofWork.ProductCategory.Add(productCategoryDTO);
            unitofWork.Save();
            return productCategoryDTO.CategoryID;
        }

        public IEnumerable<ProductCategoryDTO> GetAll()
        {
            IEnumerable<ProductCategory> productCategory = unitofWork.ProductCategory.GetAll();
            IEnumerable<ProductCategoryDTO> productCategoryDTO = mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryDTO>>(productCategory);
            return productCategoryDTO;
        }

        public ProductCategoryDTO GetById(int id)
        {
            ProductCategory productCategory = unitofWork.ProductCategory.GetById(id);
            ProductCategoryDTO productCategoryDTO = mapper.Map<ProductCategory, ProductCategoryDTO>(productCategory);
            return productCategoryDTO;
        }

        public void Remove(ProductCategoryDTO entity)
        {
            ProductCategory productCategoryDTO = mapper.Map<ProductCategoryDTO, ProductCategory>(entity);
            IEnumerable<ProductCategoryDTO> categories = GetAll().Where(a => a.ParentID == productCategoryDTO.CategoryID);
            List<ProductCategory> productCategories = mapper.Map<IEnumerable<ProductCategoryDTO>, IEnumerable<ProductCategory>>(categories).ToList();
            if (productCategories.Count != 0)
            {
                // Delete All Children if it is Parent
                unitofWork.ProductCategory.RemoveRange(productCategories);
            }
            unitofWork.ProductCategory.Remove(productCategoryDTO);
            unitofWork.Save();
        }

        public void Update(ProductCategoryDTO entity)
        {
            ProductCategory productCategoryDTO = mapper.Map<ProductCategoryDTO, ProductCategory>(entity);
            ProductCategoryDTO productCategory = GetById(productCategoryDTO.CategoryID);
            productCategoryDTO.CreatedDate = productCategory.CreatedDate;
            unitofWork.ProductCategory.Update(productCategoryDTO);
            unitofWork.Save();
        }
    }
}
