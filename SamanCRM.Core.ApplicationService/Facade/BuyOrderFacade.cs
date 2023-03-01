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
    public class BuyOrderFacade : IBuyOrderFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public BuyOrderFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(BuyOrderDTO entity)
        {
            BuyOrder buyOrderDTO = mapper.Map<BuyOrderDTO, BuyOrder>(entity);
            List<Archive> archive = new List<Archive>();
            unitofWork.BuyOrder.Add(buyOrderDTO);
            unitofWork.Save();
            // Add Files To Archive
            foreach (var item in entity.Files)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = buyOrderDTO.OrderID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "BuyOrderFiles" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.AddRange(archive);
            unitofWork.Save();
            return buyOrderDTO.OrderID;
        }

        public IEnumerable<BuyOrderDTO> GetAll()
        {
            IEnumerable<BuyOrder> buyOrder = unitofWork.BuyOrder.GetAll();
            IEnumerable<BuyOrderDTO> buyOrderDTO = mapper.Map<IEnumerable<BuyOrder>, IEnumerable<BuyOrderDTO>>(buyOrder);
            return buyOrderDTO;
        }

        public BuyOrderDTO GetById(int id)
        {
            BuyOrder buyOrder = unitofWork.BuyOrder.GetById(id);
            List<Archive> archive = unitofWork.Archive.GetArchiveByRecordID(id);
            List<string> files = new List<string>();
            // Get Related Files By ID From Archive
            foreach (var item in archive)
            {
                if (item.EntityType == "BuyOrderFiles")
                {
                    string rawPic = Convert.ToBase64String(item.File);
                    string file = "FileName:" + item.FileName + ",data:" + item.FileFormat + ";base64," + rawPic;
                    files.Add(file);
                }
            }
            BuyOrderDTO buyOrderDTO = mapper.Map<BuyOrder, BuyOrderDTO>(buyOrder);
            buyOrderDTO.Files = files;
            return buyOrderDTO;
        }

        public void Remove(BuyOrderDTO entity)
        {
            BuyOrder buyOrderDTO = mapper.Map<BuyOrderDTO, BuyOrder>(entity);
            List<Archive> archive = unitofWork.Archive.GetArchiveByRecordID(entity.OrderID);
            unitofWork.BuyOrder.Remove(buyOrderDTO);
            unitofWork.Archive.RemoveRange(archive);
            unitofWork.Save();
        }

        public void Update(BuyOrderDTO entity)
        {
            BuyOrder buyOrderDTO = mapper.Map<BuyOrderDTO, BuyOrder>(entity);
            List<Archive> archive = new List<Archive>();
            BuyOrderDTO buyOrder = GetById(buyOrderDTO.OrderID);
            buyOrderDTO.CreatedDate = buyOrder.CreatedDate;
            unitofWork.BuyOrder.Update(buyOrderDTO);
            unitofWork.Save();
            // Update Files
            foreach (var item in entity.Files)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = buyOrderDTO.OrderID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "BuyOrderFiles" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.UpdateRange(archive);
            unitofWork.Save();
        }
    }
}
