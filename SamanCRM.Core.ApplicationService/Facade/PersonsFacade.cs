using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class PersonsFacade : IPersonsFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public PersonsFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(PersonsDTO entity)
        {
            Persons personsDTO = mapper.Map<PersonsDTO, Persons>(entity);
            unitofWork.Persons.Add(personsDTO);
            unitofWork.Save();
            return personsDTO.PersonID;
        }

        public IEnumerable<PersonsDTO> GetAll()
        {
            IEnumerable<Persons> persons = unitofWork.Persons.GetAll();
            IEnumerable<PersonsDTO> personsDTO = mapper.Map<IEnumerable<Persons>, IEnumerable<PersonsDTO>>(persons);
            return personsDTO;
        }

        public PersonsDTO GetById(int id)
        {
            Persons persons = unitofWork.Persons.GetById(id);
            PersonsDTO personsDTO = mapper.Map<Persons, PersonsDTO>(persons);
            return personsDTO;
        }
        public IEnumerable<PersonsDTO> GetByAccountId(int id)
        {
            IEnumerable<Persons> persons = unitofWork.Persons.GetPersonsByAccountID(id);
            IEnumerable<PersonsDTO> personsDTO = mapper.Map<IEnumerable<Persons>, IEnumerable<PersonsDTO>>(persons);
            return personsDTO;
        }

        public void Remove(PersonsDTO entity)
        {
            Persons personsDTO = mapper.Map<PersonsDTO, Persons>(entity);
            unitofWork.Persons.Remove(personsDTO);
            unitofWork.Save();
        }

        public void Update(PersonsDTO entity)
        {
            Persons personsDTO = mapper.Map<PersonsDTO, Persons>(entity);
            PersonsDTO persons = GetById(personsDTO.PersonID);
            personsDTO.CreatedDate = persons.CreatedDate;
            unitofWork.Persons.Update(personsDTO);
            unitofWork.Save();
        }
    }
}
