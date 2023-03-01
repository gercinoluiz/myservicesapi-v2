import { container } from "tsyringe";

import IConection from '../infra/databases/IConection';
import MongooseConnection from '../infra/databases/implementations/mongoose/MongooseConnection';
import ILocation from '../../modules/locations/repositories/ILocationRepository';
import LocationRepository from '../../modules/locations/infra/mongoose/repositories/LocationRepository';
import ICoordinates from '../providers/GeoLocation/googleMaps/models/ICoordinates';
import getLocationCoordinates from '../providers/GeoLocation/googleMaps/implementations/getLocationCoordinates';
import ServicesRepository from '@modules/services-module/infra/mongoose/repositories/ServicesRepository';
import IServicesRepository from '@modules/services-module/repositories/IServiceRepository';
import IReportRepository from '../../modules/locations/repositories/IReportRepository';
import ReportRepository from '../../modules/locations/infra/mongoose/repositories/ReportRepository';
import feedBackMessages from "@modules/feedBackMessages/infra/mongoose/entities/feedBackMessages";
import {IfeedBackMessagesRepository} from "../../modules/feedBackMessages/repositories/IfeedBackMessagesRepository";
import FeedBackRepository from '../../modules/feedBackMessages/infra/mongoose/repositories/FeedBackMessagerepository';
import dependencies from './dependencies';
import ServiceTypeRepository from "@modules/services-module/infra/mongoose/repositories/ServicesTypeRepository";
import IServiceTypeRepository from "@modules/services-module/repositories/IServiceTypeRepository";
import ILocationTypeRepository from "@modules/locations/repositories/ILocationTypeRepository";
import LocationTypeRepository from "@modules/locations/infra/mongoose/repositories/LocationTypeRepository";
import { IUser } from "@modules/users/repositories/IUser";
import MongooseUserRepository from "@modules/users/infra/providers/mongoose/repositories/MongooseUserRepository";
import { SecutityRepository } from "@modules/users/infra/providers/jwt-bcrypt/repositories/SecutityRepository";
import { ISecurity } from "@modules/users/repositories/ISecurity";





container.registerSingleton<IConection>(dependencies.DBConnection, MongooseConnection)
container.registerSingleton<ISecurity>(dependencies.SecurityRepository, SecutityRepository)
container.registerSingleton<ILocation>(dependencies.LocationRepository, LocationRepository)
container.registerSingleton<ICoordinates>(dependencies.getCoordinates, getLocationCoordinates)
container.registerSingleton<IServicesRepository>(dependencies.ServiceRepository, ServicesRepository)
container.registerSingleton<IReportRepository>(dependencies.ReportRepository, ReportRepository)
container.registerSingleton<IfeedBackMessagesRepository>(dependencies.FeedBackMessageRepository, FeedBackRepository)


container.registerSingleton<IServiceTypeRepository>(dependencies.ServiceTypeRepository, ServiceTypeRepository)
container.registerSingleton<ILocationTypeRepository>(dependencies.LocationTypeRepository, LocationTypeRepository)


container.registerSingleton<IUser>(dependencies.userRepository, MongooseUserRepository)